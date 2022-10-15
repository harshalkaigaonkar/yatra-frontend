import React, { useEffect } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { getTags } from '../../apis/tagsapi';
import { useAuth } from '../../contexts/AuthContext';
import { Text } from 'react-native-paper';

function Tag({ isSelected, name, id, selectTag }) {
	return (
		<Text
			onPress={() => selectTag(id)}
			style={{
				...styles.tag,
				backgroundColor: isSelected ? 'gray' : 'white',
				colo: isSelected ? 'white' : 'black',
				borderColor: isSelected ? 'gray' : 'black',
			}}
		>
			{name}
		</Text>
	);
}

const Tags = ({ showModal }) => {
	const [tags, setTags] = React.useState([]);
	const { state } = useAuth();

	useEffect(() => {
		getTags(state.accessToken).then((data) => {
			setTags(
				data.map((tagData) => {
					return {
						...tagData,
						isSelected: false,
					};
				})
			);
		}).catch((err) => console.log(err));
	}, []);

	const selectTag = (id) => {
		setTags((prev) =>
			prev.map((tag) => {
				if (tag.id === id) {
					return {
						...tag,
						isSelected: !tag.isSelected,
					};
				}
				return tag;
			})
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView horizontal={true} style={styles.tagContainer}>
				{!!tags.length &&
					tags.map((tag) => (
						<Tag
							key={tag.id}
							name={tag.name}
							id={tag.id}
							selectTag={selectTag}
							isSelected={tag.isSelected}
						/>
					))}
			</ScrollView>
		</View>
	);
};

const styles = {
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: Dimensions.get('window').width,
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 10,
	},
	tag: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 500,
		padding: 5,
		marginLeft: 5,
		marginRight: 5,
		paddingLeft: 10,
		paddingRight: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tagContainer: {
		flexDirection: 'row',
		flex: 1,
	},
};

export default Tags;
