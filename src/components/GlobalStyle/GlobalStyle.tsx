import { ReactNode } from 'react';
import './GlobalStyle.module.scss';

interface GlobalStyleProps {
  children: any;
}

function GlobalStyle({ children }: GlobalStyleProps): ReactNode {
  return <>{children}</>;
}

export default GlobalStyle;
