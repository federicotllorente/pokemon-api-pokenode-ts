import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled, alpha } from '@mui/material/styles'
import {
  useMediaQuery,
  InputBase} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

export const SearchBar = () => {
  const navigate = useNavigate()
  const isMobileOrLarger = useMediaQuery('(min-width:425px)')
  const isTabletOrLarger = useMediaQuery('(min-width:768px)')

  const Search = styled('form')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        // width: '12ch',
        width: '20ch',
        '&:focus': {
          // width: '20ch',
          width: '28ch',
        },
      },
    },
  }))

  const searchInputRef = useRef(null)

  const handleSearchbarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ((((searchInputRef.current as unknown) as HTMLDivElement)?.children[0] as HTMLInputElement)?.value)
      navigate(`/search/${encodeURI((((searchInputRef.current as unknown) as HTMLDivElement)?.children[0] as HTMLInputElement)?.value)}`)
  }

  return (
    <Search
      sx={{
        ...(!isMobileOrLarger && { marginTop: 1, marginBottom: 2 }),
        ...(isMobileOrLarger && !isTabletOrLarger && { marginLeft: 2 })
      }}
      onSubmit={handleSearchbarSubmit}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        ref={searchInputRef}
        placeholder={isMobileOrLarger && !isTabletOrLarger ? 'Search...' : 'Search resources...'}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}
