import React, { useState, useEffect } from "react";
import api from "~/services/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { withNavigationFocus } from "react-navigation";

import Background from "~/components/Background";
import Appointment from "~/components/Appointment";

import { Container, Title, List } from "./styles";

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState();

  async function loadAppointments() {
    const { data } = await api.get("appointments");

    setAppointments(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const { data } = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: data.canceled_at
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: "Agendamentos",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  )
};

export default withNavigationFocus(Dashboard);
