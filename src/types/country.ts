interface NativeName {
  official: string
  common: string
}

interface Name {
  common: string
  official: string
  nativeName: {
    [languageCode: string]: NativeName
  }
}

export interface Country {
  name: Name
}