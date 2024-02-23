import LendingContainer from '@/containers/Lending';
import getCTokens from '@/lib/getters/getCTokens';

export default async function Lending() {
  const cTokens = await getCTokens();

  return <LendingContainer assets={cTokens} />;
}
