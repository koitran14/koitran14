import Link from 'next/link'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { usePathname } from 'next/navigation'
import PiscesLogo from './pisces-logo'


const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 300ms ease-in-out;
  }

  &:hover > svg {
    transform: rotate(360deg) scale(1.3);
  }

`

const Logo = () => {
  const pathname = usePathname();

  const activeBg = useColorModeValue( '#f97316', '#ec4899')
  const inactive = useColorModeValue('#616060', '#ffffff')
  const logoColor = pathname === '/' ? activeBg : inactive;

  return (
    (<Link href="/" scroll={false}>

      <LogoBox className='gap-x-2'>
        <PiscesLogo color={logoColor}/>
        <Text
          color={inactive}
          fontFamily='M PLUS Rounded 1c", sans-serif'
          fontWeight="bold"
        >
          Trần Ngọc Đăng Khôi
        </Text>
      </LogoBox>

    </Link>)
  );
}

export default Logo;