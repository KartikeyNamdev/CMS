const SlideBtn = ({}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div
        className="
          relative w-10 h-6 bg-gray-700 
          peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-green-200 
          rounded-full peer 
          
          /* Thumb position and transition */
          after:content-[''] after:absolute after:top-0.5 after:left-0.5 
          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
          
          /* --- THE GREEN FIX --- */
          peer-checked:bg-green-600 
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
        "
      ></div>
    </label>
  );
};
export default SlideBtn;
