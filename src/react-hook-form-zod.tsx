import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren } from 'react';

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

export default function RHFZodForm() {
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
      <div className={'mb-5'}>비회원 주문조회</div>
      <div className={'flex flex-col gap-2'}>
        <input
          type="text"
          placeholder={'주문번호'}
          {...register('orderNumber')}
        />
        {errors.orderNumber ? (
          <ErrorMessage>{errors.orderNumber.message}</ErrorMessage>
        ) : null}
        <input type="text" placeholder={'이름'} {...register('name')} />
        {errors.name ? (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        ) : null}
        <input
          type="text"
          placeholder={'연락처'}
          {...register('phone')}
          onChange={e => {
            e.target.value = formatPhoneNumber(e.target.value);
          }}
        />
        {errors.phone ? (
          <ErrorMessage>{errors.phone.message}</ErrorMessage>
        ) : null}
      </div>
      <button type={'submit'} disabled={isSubmitting}>
        {isSubmitting ? '주문조회 중...' : '주문조회'}
      </button>
    </form>
  );
}

function ErrorMessage({ children }: PropsWithChildren) {
  return <div className={'text-red-500 text-sm'}>{children}</div>;
}

export const formatPhoneNumber = (input: string) => {
  const cleanInput = input.replace(/[^0-9]/g, '');
  const length = cleanInput.length;
  if (length === 8) {
    return cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2');
  } else if (cleanInput.startsWith('02') && (length === 9 || length === 10)) {
    return cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
  } else if (!cleanInput.startsWith('02') && (length === 10 || length === 11)) {
    return cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  }
  return input;
};
