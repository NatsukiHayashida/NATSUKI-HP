export default function Hero() {
  const workHistory = [
    {
      company: '株式会社 富士工業所',
      duration: '2021 ~ 現在',
      impression: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?'
    },
    {
      company: '株式会社 ナベル',
      duration: '2010 ~ 2021',
      impression: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?'
    },
    {
      company: 'イナオ精工',
      duration: '2007 ~ 2010',
      impression: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam ea repudiandae asperiores minus corrupti doloribus ad necessitatibus magnam aliquid!'
    },
    {
      company: '社会福祉法人 伊賀市社会福祉協議会',
      duration: '1998 ~ 2007',
      impression: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam ea repudiandae asperiores minus corrupti doloribus ad necessitatibus magnam aliquid!'
    },
    // 他の勤務先の情報を追加します
  ];

  return (
    <div className='container'>
  <div className='my-8 items-center justify-center border-b '>
    <h1 className='text-4xl mb-2'>Work history</h1>
    <p className=' font-medium  text-muted-foreground my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, commodi. Labore id cupiditate aliquam maiores explicabo dolore. Reiciendis similique nulla et, optio magni minus voluptatibus, accusantium, molestias vitae enim aspernatur?</p>
  </div>
      <div className="mb-4">
    <ul >
      {workHistory.map((work, index) => (
        <li key={index} className="mb-4 px-2 border-b">
          <div className="flex items-baseline mb-1">
            <h2 className=" text-xl tracking-wider font-sans leading-normal ">{work.company}</h2>
            <p className=" mx-6 text-sm text-muted-foreground font-sans font-light tracking-wider ">{work.duration}</p>
          </div>
          <p className="mb-4">{work.impression}</p>
        </li>
      ))}
    </ul>
  </div>
</div>
  )
}