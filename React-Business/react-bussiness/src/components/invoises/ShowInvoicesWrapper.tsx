import { useSelector } from "react-redux";
import { RootState } from "../UserRedux/reduxStore";
import AccountantHome from "./AccountantHome";
import ShowInvoices from "./showInvoises";
const ShowInvoicesWrapper = () => {
    const user = useSelector((state: RootState) => state.Auth.user);
    return user.accountantId !== null ? <ShowInvoices /> :<AccountantHome /> ;
};
export default ShowInvoicesWrapper;