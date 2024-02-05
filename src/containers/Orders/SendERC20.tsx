import HeaderTitle from '../../components/HeaderTitle';

export default function SendERC20() {
  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        Send USDT 148,721.63 (AED) 550,219.65 to escrow
      </HeaderTitle>

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
