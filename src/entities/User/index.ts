export {
    reducer as user,
    setMailSended,
    setMailSending,
    setActivationCodeSended,
    setActivationCode,
    setActivationCodeSending,
    setMessage,
} from './model/slice/userSlice';
export type { UserState } from './model/types/UserState';

export {
    useGetAllUsersQuery,
    useActivateUserMutation,
    useSendCodeMutation,
    useChangePasswordAlienMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    usersApi,
} from './services/queriesForUser/queriesForUser';

export {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useCheckAuthMutation,
    authApi,
} from './services/queriesForAuth/queriesForAuth';

export {
    useGetAllRolesQuery,
    rolesApi,
} from './services/queriesForRoles/queriesForRoles';

export { UserDataList } from './ui/UserDataList/UserDataList';
