import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => (
  <section>
    {console.log(concerts)}
    {concerts.map(con => <Concert key={con._id} {...con} />)}
  </section>
)

export default Concerts;