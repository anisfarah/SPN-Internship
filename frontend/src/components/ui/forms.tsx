'use client';

import { useAlert } from '@/helpers/alertHelper';
import { useModal } from '@/helpers/modalHelper';
import {
  CustomFormProps,
  DynamicFormProps,
  DynamicFormWithStepsProps,
  DynamicRatingFormProps,
  FormProps
} from '@/types/forms.type';
import cn from '@/utils/tailwindClassNameMerge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import Button from './buttons';
import { StepsContainer } from './containers';
import DynamicInputs from './dynamicInputs';
import { RatingInput } from './inputs';
import Steps from './steps';

/**
 * The main form component.
 * It takes the following props:
 * - action: The form action, defaults to empty string
 * - className: The class name for the form, defaults to an empty string
 * - moreSpace: Whether to add more space around the form, defaults to false
 * - mobileOnly: Whether to add more space only on mobile devices, defaults to false
 * - minGap: The minimum gap between the form inputs, defaults to 6
 * - children: The child components of the form, which is a collection of form inputs
 *
 * @param {FormProps} props - The form props
 * @returns {JSX.Element} The form component
 */
function Form(props: FormProps): JSX.Element {
  return (
    <form
      // Add more space around the form if moreSpace is true, and only on mobile if mobileOnly is true
      className={cn(
        `flex w-full items-center justify-center ${
          props.moreSpace ? (props.mobileOnly ? 'p-6 lg:p-16' : 'p-16') : 'p-6'
        } px-4 lg:px-10`,
        props.className
      )}
      action={props.action}
      noValidate
    >
      {/* The form container, which contains all the form inputs */}
      <div
        className={`relative flex w-full ${props.fullWidth ? '' : 'max-w-lg'} flex-col ${props.minGap ? 'gap-2' : 'gap-6'}`}
      >
        {/* The children of the form component, which is a collection of form inputs */}
        {props.children}
      </div>
    </form>
  );
}

// function DynamicFormWithSteps(props: DynamicFormWithStepsProps): JSX.Element {
//   const router = useRouter();
//   const pathname = usePathname();
//   const query = useSearchParams();
//   const { setAlert } = useAlert();
//   const [isClicked, setIsClicked] = useState(false);

//   const [state, formAction] = useFormState(props.action, {
//     alert: '',
//     status: null,
//     errors: {}
//   });

//   const changeStep = () => {
//     const nextStep = step + 1;
//     router.push(pathname + '?' + 'step=' + nextStep);
//   };
//   const step = parseInt(query.get('step') ?? '0', 10);
//   useEffect(() => {
//     if (state) {
//       // if (state.status === null) {
//       //   router.push(pathname + '?' + 'step=' + '0');
//       // }
//       if (isClicked && state.status === 100 && props?.titles && step < props?.titles?.length - 1) {
//         setIsClicked(false);
//         changeStep();
//       } else {
//         setAlert({ message: state.alert, status: state.status });
//       }
//     }
//   }, [state, setAlert]);

//   const handleClick = () => {
//     setIsClicked(true);
//     // if (Object.keys(state?.errors).length) {
//     //   console.log('🚀 ~ handleClick ~ DO not go to next step');
//     // }
//     // if (props?.titles && step < props?.titles?.length - 1) {
//     //   changeStep();
//     // }
//   };

//   return (
//     <div className="relative flex flex-col gap-2">
//       {props.titles?.length && (
//         <StepsContainer stepContainerFitWidth={props.stepContainerFitWidth}>
//           <Steps titles={props.titles || []} step={step || 0} />
//         </StepsContainer>
//       )}
//       <Form
//         fullWidth={props.fullWidth}
//         className={props?.className}
//         action={formAction}
//         // moreSpace={props.moreSpace}
//       >
//         {props.titles.map((title, index) => (
//           <DynamicInputs
//             key={`${title}-${index}`}
//             invisible={index != step}
//             isClicked={isClicked}
//             inputConfig={props.config[index]}
//             errors={state?.errors || {}}
//           />
//         ))}
//         <div className="mx-auto my-6 flex h-10 w-48 items-center justify-center">
//           <Button
//             onClick={handleClick}
//             type={'submit'}
//             // type={step < props.titles?.length - 1 ? 'button' : 'submit'}
//             withArrow
//             label={step < props.titles?.length - 1 ? 'Next' : 'Confirm'}
//           />
//         </div>
//       </Form>
//     </div>
//   );
// }

function DynamicFormWithSteps(props: DynamicFormWithStepsProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const { setAlert } = useAlert();
  const [isClicked, setIsClicked] = useState(false);

  const [state, formAction] = useFormState(props.action, {
    alert: '',
    status: null,
    errors: {}
  });

  const changeStep = () => {
    const nextStep = step + 1;
    router.push(pathname + '?' + 'step=' + nextStep);
  };
  
  const step = parseInt(query.get('step') ?? '0', 10);

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsClicked(true);

    if (step < props.titles?.length - 1) {
      // Create FormData manually from the form
      const formData = new FormData(event.currentTarget);
      props.action(null, formData); // Pass null as initialState and FormData to the action
      changeStep();
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      {props.titles?.length && (
        <StepsContainer stepContainerFitWidth={props.stepContainerFitWidth}>
          <Steps titles={props.titles || []} step={step || 0} />
        </StepsContainer>
      )}
      <Form
        fullWidth={props.fullWidth}
        className={props?.className}
        action={formAction}
        onSubmit={handleClick}
      >
        {props.titles.map((title, index) => (
          <DynamicInputs
            key={`${title}-${index}`}
            invisible={index != step}
            isClicked={isClicked}
            inputConfig={props.config[index]}
            errors={state?.errors || {}}
          />
        ))}
        <div className="mx-auto my-6 flex h-10 w-48 items-center justify-center">
          <Button
            type="submit"
            withArrow
            label={step < props.titles?.length - 1 ? 'Next' : 'Confirm'}
          />
        </div>
      </Form>
    </div>
  );
}


function DynamicForm(props: DynamicFormProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const q = useSearchParams();
  const step = parseInt(q.get('step') ?? '0', 10);
  const { setAlert } = useAlert();
  // const { setIsOpen } = useModal();
  const [isClicked, setIsClicked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const tab = q.get('tab');
  const [state, formAction] = useFormState(props.action, {
    alert: '',
    status: null,
    errors: {}
  });

  const changeStep = () => {
    const nextStep = step + 1;
    router.push(pathname + '?' + 'step=' + nextStep);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    setShowMore(checked);
    router.push(pathname);
  };

  useEffect(() => {
    if (state) {
      // if (state.status === 200 || state.status === 201) {
      //   // setIsOpen(false);
      //   router.refresh();
      // }
      setAlert({ message: state.alert, status: state.status });
      if (props.setOverlayIsOpen && (state.status === 200 || state.status === 201)) {
        props.setOverlayIsOpen(false);
      }
    }
  }, [state, setAlert]);

  const handleClick = () => {
    setIsClicked(true);
    if (props.withSteps && props?.titles && step < props?.titles?.length - 1) {
      changeStep();
    }
  };
  // console.log('🚀 ~ DynamicForm ~ props.config:', props.config);

  return (
    <Form
      fullWidth={props.fullWidth}
      withTabs={props.withTabs}
      className={props?.className}
      action={formAction}
    >
      {props.withSteps && (
        <div className="-mt-10 flex flex-auto items-center justify-start">
          <StepsContainer>
            <Steps titles={props.titles || []} step={step || 0} />
          </StepsContainer>
        </div>
      )}
      {props.withSteps && props.titles ? (
        props.titles.map((title, index) => (
          <DynamicInputs
            key={index}
            invisible={index !== step}
            isClicked={isClicked}
            inputConfig={props.config[index]}
            errors={state?.errors || {}}
          />
        ))
      ) : props?.withTabs && props.titles ? (
        props?.titles.map((title, index) => (
          <DynamicInputs
            key={index}
            invisible={title !== tab}
            isClicked={isClicked}
            inputConfig={props.config[index]}
            errors={state?.errors || {}}
          />
        ))
      ) : (
        <>
          <DynamicInputs
            isClicked={isClicked}
            inputConfig={props.config}
            errors={state?.errors || {}}
          />
          {props.withShowMore && (
            <div>
              <label className="order-2">
                <input
                  className="order-1 checked:accent-primary"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className=""> {props.showMoreLabel} </span>
              </label>
            </div>
          )}
          {showMore && (
            <DynamicInputs
              isClicked={isClicked}
              inputConfig={props?.secondConfig || []}
              errors={state?.errors || {}}
            />
          )}
        </>
      )}
      {props.children}
      <div className="mx-auto my-6 flex h-10 w-48 items-center justify-center">
        {!props.withoutButton && (
          <Button
            onClick={handleClick}
            type={
              props.withSteps && props.titles && step < props.titles?.length - 1
                ? 'button'
                : 'submit'
            }
            withArrow
            label="Confirm"
          />
        )}
      </div>
    </Form>
  );
}  
function DynamicFormWithTabs(props: DynamicFormProps): JSX.Element {
  const q = useSearchParams();
  const { setAlert } = useAlert();
  // const { setIsOpen } = useModal();
  const [isClicked, setIsClicked] = useState(false);
  const tab = q.get('tab') || props.defaultTab;
  const [state, formAction] = useFormState(props.action, {
    alert: '',
    status: null,
    errors: {}
  });

  useEffect(() => {
    if (state) {
      // if (state.status === 200 || state.status === 201) {
      //   // setIsOpen(false);
      //   router.refresh();
      // }
      setAlert({ message: state.alert, status: state.status });
      if (props.setOverlayIsOpen && (state.status === 200 || state.status === 201)) {
        props.setOverlayIsOpen(false);
      }
    }
  }, [state, setAlert]);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <Form
      fullWidth={props.fullWidth}
      withTabs
      className={props?.className}
      action={formAction}
      // moreSpace={props.moreSpace}
    >
      {props.titles &&
        props?.titles.map((title, index) => (
          <DynamicInputs
            invisible={title != tab}
            key={`${title}-${index}`}
            isClicked={isClicked}
            inputConfig={props.config[index]}
            errors={state?.errors || {}}
          />
        ))}
      {props.children}
      <div className="mx-auto my-6 flex h-10 w-48 items-center justify-center">
        {!props.withoutButton && (
          <Button onClick={handleClick} type={'submit'} withArrow label="Confirm" />
        )}
      </div>
    </Form>
  );
}
function CustomForm(props: CustomFormProps): JSX.Element {
  const { setAlert } = useAlert();
  const { setIsOpen } = useModal();
  const setIsClicked = props.setIsClicked;
  const router = useRouter();

  const [state, formAction] = useFormState(props.action, {
    alert: '',
    status: null,
    errors: {}
  });

  useEffect(() => {
    if (state) {
      if (state.status === 200 || state.status === 201) {
        setIsOpen(false);
        router.refresh();
      }
      setAlert({ message: state.alert, status: state.status });
      if (props.setOverlayIsOpen && (state.status === 200 || state.status === 201)) {
        props.setOverlayIsOpen(false);
      }
    }
  }, [state, setAlert]);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <Form
      fullWidth={props.fullWidth}
      className={props.className ? props.className : ''}
      action={formAction}
      moreSpace
    >
      {props.children}
      <div className="mx-auto my-6 flex h-10 w-48 items-center justify-center">
        <Button onClick={handleClick} type={'submit'} withArrow label="Confirm" />
      </div>
    </Form>
  );
}
function DynamicRatingForm(props: DynamicRatingFormProps) {
  const { setAlert } = useAlert();

  const [state, formAction] = useFormState(props.action, { alert: '', status: null, errors: {} });

  useEffect(() => {
    setAlert({ message: state?.alert, status: state?.status });
  }, [state, setAlert]);
  const actionWithAlert = formAction.bind(setAlert);

  return (
    <Form className={'py-8'} action={actionWithAlert} moreSpace>
      <input type="hidden" name="id" value={props.agencyId} />
      <div className="flex w-full flex-col gap-3">
        {props.config?.map((conf: any, index) => (
          <RatingInput label={conf.label} name={conf.name} key={index} defaultValue={conf.value} />
        ))}
      </div>
      <div className="mx-auto my-6 flex h-10 w-48 items-center justify-center">
        <Button type="submit" withArrow label={props.buttonLabel ? props.buttonLabel : 'Confirm'} />
      </div>
    </Form>
  );
}
export default Form;
export { CustomForm, DynamicForm, DynamicFormWithSteps, DynamicFormWithTabs, DynamicRatingForm };
