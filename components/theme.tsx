import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps | Record<string, any>) => ({
    body: {
      bg: mode('#FAFAFA', '#0A0A0B')(props),
      color: mode('#18181B', '#E4E4E7')(props),
      lineHeight: 1.7
    }
  })
}

const components = {
  Heading: {
    variants: {
      'page-title': {
        fontSize: { base: 36, md: 48 },
        fontWeight: 600,
        lineHeight: 1.05,
        letterSpacing: '-0.03em'
      },
      'section-title': (props: StyleFunctionProps | Record<string, any>) => ({
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: mode('#09090B', '#FAFAFA')(props),
        marginTop: 14,
        marginBottom: 5
      })
    }
  },
  Link: {
    baseStyle: (props: StyleFunctionProps | Record<string, any>) => ({
      color: mode('#2563EB', '#60A5FA')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'Space Grotesk', system-ui, sans-serif",
  body: "'Archivo', system-ui, sans-serif"
}

const colors = {
  glassTeal: '#88ccca'
}

const config= {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts
})

export default theme;
