import Scrollbar from 'smooth-scrollbar';
import { ScrollbarOptions } from 'smooth-scrollbar/interfaces';

const scrollbar = (options?: ScrollbarOptions) => {
  return {
    mounted: (el: any) => {
      Scrollbar.init(el, options);
    }
  };
};

export default scrollbar;
