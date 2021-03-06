import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";

import { parseISO, formatRelative } from "date-fns";
import pt from "date-fns/locale/pt";

import Icon from "react-native-vector-icons/MaterialIcons";

import api from "~/services/api";

import Background from "~/components/Background";

import { Container, Avatar, Name, Time, SubmitButton } from "./styles";

export default function Confirm({ navigation }) {
  const provider = navigation.getParam("provider");
  const time = navigation.getParam("time");
  // console.log(time);

  const timeFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAddAppointment() {
    const a = await api.post("appointments", {
      provider_id: provider.id,
      date: time
    });
    // console.log(a);
    // console.log("chegou antes");
    // navigation.popToTop(); //serve para desfazer a pilha e ir para a primeira pagina
    navigation.navigate("Dashboard");
    // console.log("chegou dps");
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}`
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{timeFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: "Confirmar agendamento",
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  )
});
