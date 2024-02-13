import InfoCard from "./InfoCard";

const Info = () => {
  return (
    <section className="w-full h-fit flex flex-col xl:flex-row items-center gap-8">
      <InfoCard label={"Invite your friends and earn more!"} />
      <InfoCard label={"Your Rank:"} rank="14" />
    </section>
  );
};
export default Info;
