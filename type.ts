export interface ImageType {
    href: string;
    alt?: string;
}

export interface Project {
    id?: string,
    title?: string,
    href: string,
    author?: string,
    newest?: boolean,
    description?: string,
    field?: string,
    filter?: string 
}

export interface Field {
    href?: string,
    id: string,
}