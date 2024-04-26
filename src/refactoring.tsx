import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputHTMLAttributes, PropsWithChildren } from 'react';

const schema = z.object({
  orderNumber: z
    .string()
    .min(1, '주문번호를 입력해주세요')
    .max(20, '주문번호는 20자 이하입니다')
    .regex(
      /^ORD\d{6}-[A-Za-z0-9]{10}$/,
      "주문번호 형식이 올바르지 않습니다. 'ORDXXXXXX-XXXXXXXXXX' 형식을 따라야 합니다"
    ),
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .max(13, '연락처는 13자 이하입니다'),
  email: z.string().email('이메일 형식이 올바르지 않습니다')
  // ...... 등등등
});

type OrderForm = z.infer<typeof schema>;

export default function RHFZodRefactoringForm() {
  const method = useForm<OrderForm>({
    resolver: zodResolver(schema)
  });

  const {
    register,
    formState: { errors, isSubmitting }
  } = method;

  const handleSubmit = async (data: OrderForm) => {
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={method.handleSubmit(handleSubmit)}>
      <div className={'flex flex-col gap-2'}>
        <InputField
          placeholder={'주문번호'}
          {...register('orderNumber')}
          message={errors.orderNumber?.message}
        />
        <InputField
          placeholder={'이름'}
          {...register('name')}
          message={errors.name?.message}
        />
        <InputField
          placeholder={'연락처'}
          {...register('phone')}
          onChange={e => {
            e.target.value = formatPhoneNumber(e.target.value);
          }}
          message={errors.phone?.message}
        />
      </div>
      <button type={'submit'} disabled={isSubmitting}>
        {isSubmitting ? '주문조회 중...' : '주문조회'}
      </button>
    </form>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  message?: string;
};

function InputField({ message, ...rest }: InputFieldProps) {
  return (
    <div>
      <input {...rest} />
      {message ? <ErrorMessage>{message}</ErrorMessage> : null}
    </div>
  );
}

function ErrorMessage({ children }: PropsWithChildren) {
  return <div className={'text-red-500 text-sm'}>{children}</div>;
}

export const formatPhoneNumber = (input: string) => {
  // ... logic
  return input;
};
