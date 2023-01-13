import React from "react";
import PercentageCircle from "@/components/shared/PercentageCircle";
import { Avatar } from "primereact/avatar";
import Card from "@/components/shared/Card";
import LineChart from "@/components/charts/LineChart";

function MyAccount() {
  return (
    <>
      <div className="grid-3-1">
        <div
          className="flex flex-column w-full"
          style={{ height: "fit-content" }}
        >
          {/* Header */}
          <Card title="Estadisitcas" height="">
            <div className="flex flex-column justify-content-center align-items-center w-full">
              <Avatar
                image="assets/images/mypic.png"
                shape="circle"
                className="w-8rem h-8rem shadow-2"
              />
              <h4 className="mt-3 uppercase">Carlos Antonio Bueno Tavares</h4>
            </div>

            <div className="w-full px-4 pt-1 ">
              {/* Estadisticas */}
              <ul className="shadow-1 card mb-0 grid-col-3 px-2 text-center">
                <li className="flex flex-column m-0">
                  <h4 className="mb-1">{0} </h4> Pendientes
                </li>
                <li className="w-full border-x-1 border-200 flex flex-column m-0">
                  <h4 className="mb-1">{0}</h4> Completadas
                </li>
                <li className="flex flex-column m-0">
                  <h4 className="mb-1">2</h4> Retrasadas
                </li>
              </ul>
            </div>
          </Card>

          {/* Activities */}

          <Card title="Actividades" height="">
            {/* PENDING */}
            {0 > 0 ? (
              <div>
                <h6 className="uppercase letter-spacing-1">
                  Actividades pendientes
                </h6>
                <hr />
                {/* <div className="grid-col-2 w-full">
                {pending?.map((p: any) => (
                  <ActivityCard
                    key={p._id}
                    onClick={() => handleSelectActivity(p)}
                    {...p}
                  />
                ))}
              </div> */}
              </div>
            ) : (
              <div className=" bg-red-400 w-full p-4 text-center">
                No tienes actividades pendientes
              </div>
            )}
          </Card>
        </div>
        <div>
          <Card title="Eficiencia" height="fit">
            <PercentageCircle value={100} size={180} />
          </Card>
          <Card title="Realizados - top 5" height="" className="flex-1">
            <p>d</p>
          </Card>
        </div>
        {/* <div className="card shadow-1" style={{ height: "fit-content" }}>
        <PercentageCircle value={100} size={180} />
        <div className="time-circle">
      <span>{result || 0}%</span>
    </div>
        {progress && (
          <div className="text-center">
            <div
              className="card"
              onClick={() => handleSelectActivity(progress)}
            >
              <h5>En proceso</h5>
              <div className="text-3xl shadow-2 p-2 border-round-sm cursor-pointer">
                <Countdown
                  date={progress?.startedAt + toMilliseconds(progress?.hours)}
                />
              </div>
            </div>
          </div>
        )}
        {completed.length > 0 && (
          <div>
            <h6 className="uppercase letter-spacing-1">Realizados</h6>
            {completed.map((i: any) => (
              <div
                onClick={() => handleSelectActivity(i)}
                className="w-full h-4rem bg-red shadow-1 mb-2 flex align-items-center justify-content-between p-3 cursor-pointer"
              >
                <p className="m-0">{i.description}</p>
                <p className="bg-green-400 shadow-2 p-2 border-round-md">
                  {getEficiencia([i])}
                </p>
              </div>
            ))}
          </div>
        )}
      </div> */}
      </div>
      <Card title="Ultimos 6 meses" height="">
        <LineChart />
      </Card>
    </>
  );
}

export default MyAccount;
