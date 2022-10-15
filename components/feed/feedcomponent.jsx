import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { getEvents } from '../../apis/eventsapi';
import { useAuth } from '../../contexts/AuthContext';

export default function FeedComponent() {
	const [events, setEvents] = React.useState([]);
	const { state } = useAuth();

	React.useEffect(() => {
		getEvents(state.accessToken).then((data) => {
      setEvents(data);
		});
	}, []);

	return (
		<ScrollView
			style={{
				padding: 10,
			}}
		>
			{!!events.length &&
				events.map((event) => (
					<Card
						style={{
							marginBottom: 10,
						}}
					>
						{!!event.image && (
							<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
						)}
						<Card.Title title={event.title} subtitle={event.log.user.username} />
						<Card.Content>
							<Paragraph>{event.content}</Paragraph>
              <Text
                style={{
                  alignSelf: 'flex-end',
                }}
              >{event.log.place}</Text>
						</Card.Content>
					</Card>
				))}
		</ScrollView>
	);
}
