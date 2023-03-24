import GameRow from './components/GameRow';
import { Card, Skeleton } from 'antd';
import { useGetGamesQuery } from 'app/services/game';
import isEmpty from 'lodash/isEmpty';

const Games = () => {
  const { data, isFetching } = useGetGamesQuery({ page: '1', pageSize: '1' }, { refetchOnMountOrArgChange: true });
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
  if (isFetching) return <Skeleton active/>;
  if (!data || isEmpty(data)) return <Card>Mänge ei leitud</Card>;
  // const onChange = async (value: any, value2: any) => {
  //   console.log(searchParams.get('page'), 'page');
  //   setSearchParams({ page: value, pageSize: value2 });
  //   const newData = await getGames({ page: searchParams.get('page'), pageSize: '5' }).unwrap();
  //   setData(newData);


  // };

  return <>
    {/* <Pagination onChange={onChange} total={500} /> */}
    {data.map((game:any) => <GameRow key={game.id} game={game}/>)}

  </>;
};

export default Games;