import HeaderTitle from '../../components/HeaderTitle';

type Props = {
  title: string;
};

export default function SendERC20({ title }: Props) {
  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">{title}</HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        >
          <img src="/metamask.png" alt="metamask icon" className="h-8 w-8" />
          Transfer
        </button>
      </div>
    </>
  );
}
