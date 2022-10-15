import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, TouchableNativeFeedback} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Button, Text} from 'react-native-paper';
import Header from '../../components/header';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule = ({route}) => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
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
              <Avatar.Text label="J" />
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header route={route} />
      <View style={{width: Dimensions.get("window").width, backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 18, paddingRight: 18}}>
        <Text variant="titleLarge">My Travel Log</Text>
        <TouchableNativeFeedback>
          <Button icon="plus" mode="elevated" buttonColor="white" style={{backgroundColor: "#fff", margin: 10, width: 100, borderWidth: 2, borderColor: "#CF9FFF", borderRadius: 30, height: 45}}>
            New
          </Button>
        </TouchableNativeFeedback>
      </View>
      <Agenda
        style={{height: "100%"}}
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Schedule;