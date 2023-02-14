import { useStores } from '~/stores';

export const Home: React.FC = () => {
    const { appStore } = useStores();

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => appStore.toggleTheme()}>Toggle Dark Mode</button>
        </>
    );
};
