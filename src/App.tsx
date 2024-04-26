import ControlledForm from './controll-form.tsx';
import UnControlledForm from './uncontroll-form.tsx';
import UnControlledForm2 from './uncontroll-form-2.tsx';
import RHFZodForm from './react-hook-form-zod.tsx';
import RHFZodRefactoringForm from './refactoring.tsx';

function App() {
  return (
    <div className={'mx-auto max-w-lg w-full'}>
      <div>제어 컴포넌트</div>
      <ControlledForm />
      <hr className={'my-10'} />
      <div>비제어 컴포넌트 useRef</div>
      <UnControlledForm />
      <hr className={'my-10'} />
      <div>비제어 컴포넌트 formData</div>
      <UnControlledForm2 />
      <hr className={'my-10'} />
      <div>리액트 훅 폼 컴포넌트</div>
      <RHFZodForm />
      <hr className={'my-10'} />
      <div>리액트 훅 폼2 컴포넌트</div>
      <RHFZodRefactoringForm />
    </div>
  );
}

export default App;
