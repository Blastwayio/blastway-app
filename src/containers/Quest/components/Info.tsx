import InfoCard from './InfoCard';

const Info = () => {
  return (
    <section className="flex h-fit w-full flex-col items-center gap-8 xl:flex-row">
      <InfoCard label={'Invite your friends and earn more!'} />
      <InfoCard label={'Your Rank:'} rank="14" />
    </section>
  );
};
export default Info;
