import Map from 'components/Map'
import data from 'polygons'

import '../app.scss'

export const MainMap = () => {
  return (
    <div className="mainmap__wrapper">
      <Map geoData={data} />
    </div>
  )
}
