
import { flsModules } from "../modules.js";
import IMask from 'imask';

document.addEventListener("DOMContentLoaded", () => {
  const inputMasks = document.querySelectorAll('[type="tel"]');
  
  if (inputMasks.length) {
    const masks = [];
    
    inputMasks.forEach(input => {
      const mask = IMask(input, {
        mask: '+{7} (000) 000-00-00',
        lazy: true, 
        placeholderChar: '_'
      });
      
      masks.push(mask);
    });
    
    flsModules.inputmask = masks;
  }
});