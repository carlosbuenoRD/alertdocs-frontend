// COMPONENTS
import { useAppSelector } from "@/redux/store";
import { Accordion, AccordionTab } from "primereact/accordion";
import Column from "./Column";

function KanbaContainer(props: any) {
  const { activities } = useAppSelector((state) => state.activity);

  console.log(activities, "acfadsfadsf");

  return (
    <div className="">
      {activities.length > 0 && (
        <>
          {props.multiple ? (
            <Accordion>
              <AccordionTab>
                <div className="grid flex-nowrap w-full place-items-center">
                  <Column
                    header="Pendientes"
                    items={activities?.filter(
                      (i: any) => i.state === "pending" || "ready"
                    )}
                  />
                  <Column
                    header="En Proceso"
                    items={activities?.filter(
                      (i: any) => i.state === "progress"
                    )}
                  />
                  <Column
                    header="Revision"
                    items={activities?.filter(
                      (i: any) => i.state === "revision"
                    )}
                  />
                  <Column
                    header="Completados"
                    items={activities?.filter(
                      (i: any) => i.state === "completed"
                    )}
                  />
                </div>
              </AccordionTab>
            </Accordion>
          ) : (
            <div
              className="grid flex-nowrap w-full place-items-center border-200 border-round-md scroll-hidden"
              style={{
                height: "700px",
                overflow: "scroll",
              }}
            >
              <Column
                header="Pendientes"
                items={activities?.filter(
                  (i: any) => i.state === "pending" || i.state === "ready"
                )}
              />
              <Column
                header="En Proceso"
                items={activities?.filter((i: any) => i.state === "progress")}
              />
              <Column
                header="Revision"
                items={activities?.filter((i: any) => i.state === "revision")}
              />
              <Column
                header="Completados"
                items={activities?.filter((i: any) => i.state === "completed")}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default KanbaContainer;
