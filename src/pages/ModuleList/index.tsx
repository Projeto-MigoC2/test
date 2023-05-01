import { Container, ListContainer } from "./styles";
import Header from "../../components/global/Header";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Modulo from "../../types/modulo";
import { Box, Skeleton, VStack } from "native-base";
import { useEffect, useState } from "react";
import ModuleItem from "../../components/ModuleListComponents/ModuleItem";

export default function ModuleList() {
  const [modulos, setModulos] = useState<Modulo[]>([]);

  async function fetchModulos(): Promise<Modulo[]> {
    console.log("fetching modulos");
    const response = await api.get("modulos");
    return response.data;
  }

  const { data, error, fetchStatus, isLoading } = useQuery({
    queryKey: ["modulos"],
    queryFn: () => fetchModulos(),
  });

  useEffect(() => {
    // order by name
    if (data) {
      const modulos = data.sort((a: Modulo, b: Modulo) => {
        if (a.nome > b.nome) {
          return 1;
        }
        if (a.nome < b.nome) {
          return -1;
        }
        return 0;
      });

      setModulos(modulos);
    }
  }, [data]);

  return (
    <Container>
      <Header title="Módulos" />

      {isLoading && (
        <ListContainer space={4} alignItems="center">
          <Box>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} height={10} />
            ))}
          </Box>
        </ListContainer>
      )}

      {modulos && (
        <ListContainer space={4} alignItems="center">
          {modulos.map((modulo) => (
            <ModuleItem modulo={modulo} key={modulo.id} />
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
