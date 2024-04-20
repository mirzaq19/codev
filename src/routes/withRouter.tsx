import { useLocation, useNavigate, useParams } from 'react-router-dom';

export type RouterProps = {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  params: ReturnType<typeof useParams>;
};

function withRouter<P>(Component: React.ComponentType<P>) {
  function ComponentWithRouterProp(props: object) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component {...(props as P)} router={{ location, navigate, params }} />
    );
  }
  return ComponentWithRouterProp;
}

export default withRouter;
