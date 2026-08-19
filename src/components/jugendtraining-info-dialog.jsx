import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import JugendtrainingKostenplan from "@/components/jugendtraining-kostenplan";

function JugendtrainingInfoDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root size="xl" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Text className="button bg-white text-tch-blue hover:cursor-pointer">
          Infos & Anpassungen Wintersaison
          <ChevronDoubleRightIcon className="size-5 pt-1" />
        </Text>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Wintersaison 2026/2027 – Anpassung der Trainingsabrechnung
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <div className="flex flex-col gap-6">
                {/* <div className="flex flex-col gap-2">
                  <h2>Informationsschreiben zum Jugendtraining</h2>
                  <p>
                    Wintersaison 2026/2027 – Anpassung der Trainingsabrechnung
                  </p>
                </div> */}

                <div className="flex flex-col gap-4">
                  <p>Liebe Eltern, liebe Erziehungsberechtigte,</p>
                  <p>
                    die Jugendarbeit und insbesondere das Jugendtraining sind
                    ein wichtiger Bestandteil unseres Vereinslebens. Ziel war
                    und ist es immer unseren Kindern und Jugendlichen möglichst
                    gute Trainingsmöglichkeiten zu bieten.
                  </p>
                  <p>
                    In der Vergangenheit wurde das Jugendtraining des Vereins
                    durch private Sponsorengelder teilweise finanziell
                    unterstützt.
                  </p>
                  <p>
                    Zum Ende der aktuellen Sommersaison haben diese privaten
                    Sponsoren leider Ihren Rückzug angekündigt.
                  </p>
                  <p>
                    <strong>
                      Somit ist es dem Verein aus wirtschaftlichen Gründen ab
                      der Wintersaison 2026/2027 leider nicht mehr möglich, das
                      kommerzielle Jugendtraining finanziell weiter zu
                      bezuschussen.
                    </strong>
                  </p>
                  <p>
                    Das bedeutet, dass ab der Wintersaison 2026/2027 sämtliche
                    Trainingsstunden vollständig zu bezahlen sind. Die
                    Abrechnung erfolgt entsprechend der gebuchten
                    Trainingsstunden und auf Grundlage des beigefügten
                    Kostenplans.
                  </p>
                  <p>
                    <strong>
                      Wichtig: Ab der Wintersaison 2026/2027 werden die
                      gebuchten Trainingsstunden vollständig berechnet. Evtl.
                      bisherigen finanziellen Zuschüsse bzw. Entgegenkommen des
                      Vereins entfallen.
                    </strong>
                  </p>
                  <p>
                    Wir wissen, dass diese Änderung für Eltern und Familien eine
                    zusätzliche finanzielle Belastung bedeuten kann.
                    Gleichzeitig ist diese Anpassung aufgrund der
                    wirtschaftlichen Situation des Vereins notwendig, damit wir
                    den Trainings- und Spielbetrieb auch künftig verlässlich
                    aufrechterhalten können.
                  </p>
                  <p>
                    Wir bitten euch daher um Verständnis für diese notwendige
                    Entscheidung und bedanken uns ausdrücklich für eure
                    Unterstützung und euer Verständnis.
                  </p>
                  <p>
                    Unser Ziel bleibt es, Kindern und Jugendlichen im TC
                    Holzminden weiterhin ein attraktives, qualitativ gutes und
                    verlässliches Tennisangebot zu ermöglichen.
                  </p>
                  <p>
                    Mit sportlichen Grüßen <br />
                    <strong>
                      Der Vorstand <br />
                      TC Holzminden von 1928 e.V.
                    </strong>
                  </p>
                </div>

                <JugendtrainingKostenplan />
              </div>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default JugendtrainingInfoDialog;
