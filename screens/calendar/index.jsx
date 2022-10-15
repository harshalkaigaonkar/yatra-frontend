import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions, TouchableNativeFeedback} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Button, Text} from 'react-native-paper';
import Header from '../../components/header';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule = ({route, navigation}) => {
  const [items, setItems] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const json = [
    {
    startDate: '2022-10-12',
    endDate: '2022-10-14',
    events: [
      {
        date: "2022-10-12",
        headline: "Hello, Here."
      },
      {
        date: "2022-10-12",
        headline: "Hello, Here 2."
      },
      {
        date: "2022-10-13",
        headline: "Hello, Here 3."
      },
    ]
  },
    {
    startDate: '2022-10-15',
    endDate: '2022-10-16',
    events: [
      {
        date: "2022-10-15",
        headline: "Hello, Here."
      },
      {
        date: "2022-10-15",
        headline: "Hello, Here 2."
      },
      {
        date: "2022-10-16",
        headline: "Hello, Here 3."
      },
    ]
  },
]

  useEffect(() => {
  })

  const markedDatesFunc = () => {
    const dates = {};
     json.forEach((data) => {
      dates[data.startDate] = {startingDay: true, color: 'black', textColor: 'white'};
      dates[data.endDate] = {endingDay: true, color: 'black', textColor: 'white'};
    })
    return dates;
  }

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header route={route} navigation={navigation} />
      <View style={{width: Dimensions.get("window").width, backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 18, paddingRight: 18}}>
        <Text variant="titleLarge">My Travel Log</Text>
        <TouchableNativeFeedback>
          <Button icon="plus" mode="elevated" buttonColor="white" style={{backgroundColor: "#fff", margin: 10, width: 100, borderWidth: 2, borderColor: "#CF9FFF", borderRadius: 30, height: 45}}>
            New
          </Button>
        </TouchableNativeFeedback>
      </View>
      <Agenda
        style={{ flexDirection: "column", height: 1000}}
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
        showScrollIndicator={true}
        minDate={"2010-01-01"}
        maxDate={"2025-12-31"}
        theme={{
          agendaKnobColor: 'black',
          selectedDayBackgroundColor: 'black',
          selectedDayColor: 'black',
          textDayFontWeight: '900',
          agendaKnobHeight: 100
        }}
        onDayLongPress={(data) => console.log(data)}
        markingType="period"
        markedDates={markedDatesFunc()}
      />
    </View>
  );
};

export default Schedule;