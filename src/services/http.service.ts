import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import { toast } from 'react-toastify';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Params {
  [key: string]: any;
}

export interface GenericOptions {
  url: string;
  params?: Params;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

class HttpService {
  private http: AxiosInstance;
  private baseURL = process.env.REACT_APP_APPLICATION_SERVICE_URL;
  private setLoading?: React.Dispatch<React.SetStateAction<boolean>>;

  constructor(
    config = {},
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders(),
      ...config,
    });
    this.setLoading = setLoading;
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors();

    return this;
  }

  // Set up request headers
  private setupHeaders(hasAttachment = false) {
    return hasAttachment
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };
  }

  // Handle HTTP requests
  private async request<T>(
    method: HttpMethod,
    url: string,
    options: AxiosRequestConfig,
    successMessage?: string,
  ): Promise<T> {
    try {
      this.setLoading && this.setLoading(true);
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });
      successMessage && toast.success(successMessage);
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      if (401 === typedError?.response?.status) {
        console.log('check if token refresh is needed...');
        return this.request(method, url, options);
      }

      return this.normalizeError(error);
    } finally {
      this.setLoading && this.setLoading(false);
    }
  }

  // Perform GET request
  public async get<T>(
    url: string,
    params?: Params,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(HttpMethod.GET, url, {
      params,
      //headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform POST request
  public async push<T, P>(
    url: string,
    payload: P,
    params?: Params,
    hasAttachment = false,
    successMessage?: string,
  ): Promise<T> {
    return this.request<T>(
      HttpMethod.POST,
      url,
      {
        params,
        data: payload,
        headers: this.setupHeaders(hasAttachment),
      },
      successMessage,
    );
  }

  // Perform UPDATE request
  public async update<T, P>(
    url: string,
    payload: P,
    params?: Params,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(HttpMethod.PUT, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform DELETE request
  public async remove<T>(
    url: string,
    params?: Params,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(HttpMethod.DELETE, url, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Inject interceptors for request and response
  private injectInterceptors() {
    // Set up request interceptor
    this.http.interceptors.request.use((request) => {
      // * Perform an action
      // TODO: implement an NProgress
      return request;
    });

    // Set up response interceptor
    this.http.interceptors.response.use(
      (response) => {
        // * Do something
        return response;
      },

      (error) => {
        // * Implement a global error alert
        return Promise.reject(error);
      },
    );
  }

  // Normalize errors
  private normalizeError(error: any) {
    toast.error(error?.message ?? 'Request failed');
    return Promise.reject(error);
  }
}

export { HttpService as default };
