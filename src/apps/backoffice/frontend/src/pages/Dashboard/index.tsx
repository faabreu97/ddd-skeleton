import { Helmet } from 'react-helmet';
import PageContent from '../../components/Layout/PageContent';
import { useUser } from '../../hooks/user';

export default function Dashboard() {
  const { data: user } = useUser();

  return (
    <>
      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>
      <PageContent title="Home">
        <h5>Hello {user?.name}</h5>
      </PageContent>
    </>
  );
}
