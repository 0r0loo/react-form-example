import { useState } from 'react';

export default function ControlledForm() {
  const [orderNumber, setOrderNumber] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ orderNumber, name, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={'mb-5'}>비회원 주문조회</div>
      <div className={'flex flex-col gap-2'}>
        <input
          type="text"
          placeholder={'주문번호'}
          value={orderNumber}
          onChange={event => setOrderNumber(event.target.value)}
        />
        <input
          type="text"
          placeholder={'이름'}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder={'연락처'}
          value={phone}
          onChange={event => setPhone(event.target.value)}
        />
      </div>
      <button type={'submit'}>주문조회</button>
    </form>
  );
}
