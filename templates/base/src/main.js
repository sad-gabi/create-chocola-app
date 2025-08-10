import { renderView } from 'chocola';
import Home from './views/Home.chcl';

renderView(() => import('./views/Home.chcl'));