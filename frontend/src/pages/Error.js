import { useRouteError } from 'react-router-dom'
import PageContent from '../components/PageContent'
import MainNavigation from '../components/MainNavigation';
const ErrorPage = () => {
    const error = useRouteError();
    let title =  "An error occurred!"
    let message = "Sorry, an unexpected error occurred.";

    if(error.status === 500){
        message = error.data.message;
    }else if (error.status === 404){
        title = "Page Not Found";
        message = "Sorry, the page you are looking for does not exist.";
    }
    return (
        <>
        <MainNavigation />
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
        </>
    )
}

export default ErrorPage