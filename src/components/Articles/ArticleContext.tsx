import {createContext} from 'react'
import { ArticleProps } from './ArticleProps';

type ContextProps = {
    articles: ArticleProps[];
}

export const ArticleContext = createContext<ContextProps>({articles: []})