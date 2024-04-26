import { useRef } from 'react';

export default function UnControlledForm() {
  const orderNumberInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // api 로직
    console.log(orderNumberInputRef.current?.value);
    console.log(nameInputRef.current?.value);
    console.log(phoneInputRef.current?.value);

    if (phoneInputRef.current) {
      phoneInputRef.current.value = '010-1234-5678';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={'mb-5'}>비회원 주문조회</div>
      <div className={'flex flex-col gap-2'}>
        <input type="text" placeholder={'주문번호'} ref={orderNumberInputRef} />
        <input type="text" placeholder={'이름'} ref={nameInputRef} />
        <input type="text" placeholder={'연락처'} ref={phoneInputRef} />

        {orderNumberInputRef.current &&
        orderNumberInputRef.current.value.length > 10
          ? '10이상'
          : '10이하'}
      </div>
      <button type={'submit'}>주문조회</button>
    </form>
  );
}
