'use client';
import { SlideProps } from '@/types/motions.type';

// TODO: fix bloc: 'end' ;
function Slide(props: SlideProps) {
  function handleClick() {
    if (!props.isDragged) {
      window.scrollTo({
        top: 0
        // block: 'end'
      });
      props.setService(props.title);
    }
  }

  return (
    <span
      className={`w-fit cursor-pointer whitespace-nowrap px-4 pb-1 text-center text-sm font-medium uppercase lg:text-base ${
        props.service === props.title ? 'text-black' : 'text-grayAccent'
      }`}
      onClick={handleClick}
    >
      {props.title}
      <div
        className={`mx-auto border-b-2 border-black ${props.service === props.title ? 'w-3' : 'w-0'}`}
      />
    </span>
  );
}

// function Tabs(props: TabsProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [activeTab, setActiveTab] = useState(() => {
//     if (props.isBool) {
//       for (const param of props.data) {
//         if (searchParams.has(param.value)) {
//           return param.value;
//         }
//       }
//       if (props.includeAll) {
//         return '';
//       } else {
//         return props.data[0].value;
//       }
//     } else {
//       if (
//         searchParams.has(`${props.filter}`) &&
//         props.data?.filter((option) => option.value === searchParams.get(`${props.filter}`))
//           .length > 0
//       ) {
//         return searchParams.get(`${props.filter}`);
//       } else {
//         if (props.includeAll) {
//           return '';
//         } else {
//           return props.data[0].value;
//         }
//       }
//     }
//   });

//   const createQueryString = useCallback(
//     (name: string, value: { toString: () => string }) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(name, value.toString());
//       setActiveTab(props.isBool ? name : value);
//       if (props.isBool) {
//         props.data.map((option) => {
//           if (option.value !== name) {
//             params.delete(option.value);
//           }
//         });
//       }

//       return params.toString();
//     },
//     [searchParams, activeTab]
//   );

//   return (
//     <motion.div
//       className={`mx-auto flex w-full justify-center ${props.isShadowed && 'rounded-full shadow-inner'} items-center justify-start overflow-hidden  py-3  ${
//         props.mobileOnly && 'block xl:hidden'
//       }   ${props.desktopOnly && 'hidden xl:block'}`}
//       ref={ref}
//     >
//       <motion.div
//         className={`flex ${props.isShadowed ? 'w-fit' : 'w-full'} gap-2  px-4 md:gap-4 lg:gap-10`}
//         drag="x"
//         dragConstraints={ref}
//       >
//         {props.includeAll && props.data?.length > 1 && (
//           <motion.div
//             className="relative flex cursor-pointer flex-col items-center justify-center gap-1.5"
//             onClick={() => {
//               router.push(pathname);
//               setActiveTab('');
//             }}
//           >
//             <h3
//               className={`${
//                 activeTab === '' ? 'text-black' : 'text-grayAccent'
//               } px-3 font-semibold uppercase transition-all duration-300 ease-in-out`}
//             >
//               All
//             </h3>
//             <div
//               className={`transition-all duration-300 ease-in-out ${
//                 activeTab === '' ? 'w-4' : 'w-0'
//               } h-0.5 bg-black`}
//             />
//           </motion.div>
//         )}
//         {props.data?.map((element: any, idx: any) => (
//           <motion.div
//             className="relative flex cursor-pointer flex-col items-center justify-center gap-1.5"
//             onClick={() => {
//               props.isBool
//                 ? router.push(pathname + '?' + createQueryString(element.value, true))
//                 : router.push(pathname + '?' + createQueryString(`${props.filter}`, element.value));
//             }}
//             key={idx}
//           >
//             <span
//               className={`relative w-full ${props.isShadowed && activeTab === element.value && 'rounded-full shadow-outer'}`}
//             >
//               <h3
//                 className={`${
//                   // || (props.isBool && searchParams.has(element.value))
//                   activeTab === element.value ? 'text-black' : 'text-grayAccent'
//                 } whitespace-nowrap  ${props.isShadowed ? 'px-4 py-1' : 'px-3'} font-semibold uppercase transition-all duration-300 ease-in-out`}
//               >
//                 {element.title}
//               </h3>
//             </span>
//             {!props.isShadowed && (
//               <div
//                 className={`transition-all duration-300 ease-in-out ${
//                   activeTab === element.value ? 'w-4' : 'w-0'
//                 } h-0.5 bg-black`}
//               />
//             )}{' '}
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }
export default Slide;
