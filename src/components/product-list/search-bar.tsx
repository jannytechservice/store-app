import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { useRouter } from '../../routes/hook';
import Iconify from '../../common/iconify';
import { IProduct } from '../../types/product';

import SearchNotFound from './searhc-not-found';

type Props = {
  query: string;
  results: IProduct[];
  onSearch: (inputValue: string) => void;
  hrefItem: (id: string) => string;
};

export default function SearchBar({
  query,
  results,
  onSearch,
  hrefItem,
}: Props) {
  const router = useRouter();

  const handleClick = (id?: string) => {
    if (id) {
      router.push(hrefItem(id));
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectProduct = results.find(
          (product) => product.title === query,
        );
        if (selectProduct?.id) {
          handleClick(selectProduct.id);
        }
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      autoHighlight
      popupIcon={null}
      options={results.length > 0 ? results : []}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.title}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const matches = match(product.title, inputValue);
        const parts = parse(product.title, matches);

        return (
          <Box
            component="li"
            {...props}
            onClick={() => handleClick(product.id)}
            key={product.id}
          >
            <Avatar
              alt={product.title}
              src={product.image}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />
            <div>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight
                      ? 'fontWeightSemiBold'
                      : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}
