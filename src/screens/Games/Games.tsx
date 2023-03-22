import GameRow from './components/GameRow';
import { List, Skeleton } from 'antd';
import { useGetGamesQuery } from 'app/services/game';

const Games = () => {
  const { data, isLoading } = useGetGamesQuery({ page: '1', pageSize: '1' });
  // const [ searchParams, setSearchParams ] = useSearchParams({});
  // const [ getGames, meta ] = useLazyGetGamesQuery();
  // const [ data , setData ] = useState<GameDto[] | undefined>();

  // useEffect(() => {

  //   const currentPage = searchParams.get('page');
  //   if (!currentPage) {
  //     setSearchParams({ page: '1', pageSize: '5' });
  //     const getGameQuery = async () => {
  //       const d = await getGames({ page: '1', pageSize: '5' }).unwrap();
  //       setData(d);
  //     };
  //     getGameQuery();
  //   }else{
  //     const getGameQuery = async () => {

  //       const d = await getGames({ page: searchParams.get('page'), pageSize: '5' }).unwrap();
  //       setData(d);
  //     };
  //     getGameQuery();
  //   }

  //   console.log(searchParams);
  // }, []);

  // console.log(searchParams, 'väljas');
  if (isLoading) return <Skeleton active/>;

  // const onChange = async (value: any, value2: any) => {
  //   console.log(searchParams.get('page'), 'page');
  //   setSearchParams({ page: value, pageSize: value2 });
  //   const newData = await getGames({ page: searchParams.get('page'), pageSize: '5' }).unwrap();
  //   setData(newData);


  // };

  return <>
    {/* <Pagination onChange={onChange} total={500} /> */}
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      }}
      dataSource={data}
      renderItem={(game) => (
        <List.Item>
          <GameRow game={game}/>
        </List.Item>
      )}
    />
  </>;
};

export default Games;