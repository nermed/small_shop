import {createContext} from 'react'
import { AchatDetailProps } from './AchatDetailProps';

type ContextProps = {
    appros: AchatDetailProps[];
}

export const AchatContext = createContext<ContextProps>({appros: []})