export default function UnControlledForm2() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // api 로직
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues.orderNumber);
    console.log(formValues.name);
    console.log(formValues.phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={'mb-5'}>비회원 주문조회</div>
      <div className={'flex flex-col gap-2'}>
        <input type="text" placeholder={'주문번호'} name={'orderNumber'} />
        <input type="text" placeholder={'이름'} name={'name'} />
        <input type="text" placeholder={'연락처'} name={'phone'} />
      </div>
      <button type={'submit'}>주문조회</button>
    </form>
  );
}
