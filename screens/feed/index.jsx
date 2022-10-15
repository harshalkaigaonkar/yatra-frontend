import React from 'react';
import { Dimensions, View } from 'react-native';
import Header from '../../components/header';
import Tags from '../../components/tags';
import {
	Modal,
	Portal,
	Text,
	Button,
	Provider,
	TextInput,
} from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { createTag } from '../../apis/tagsapi';
import FeedComponent from '../../components/feed/feedcomponent';

const Feed = ({ route }) => {
	const [visible, setVisible] = React.useState(false);
	const [errors, setErrors] = React.useState({
		tag: '',
	});
	const { state } = useAuth();

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const containerStyle = {
		backgroundColor: 'white',
		padding: 20,
		height: Dimensions.get('window').height * 0.4,
	};
	const [tagName, setTagName] = React.useState('');

	const handleChangeTagName = (text) => {
		setTagName(text);
	};

	const handleCreateTag = async () => {
		if (!tagName) {
			setErrors({ ...errors, message: 'Tag name is required' });
			return;
		}
		const data = await createTag(state.accessToken, tagName.toLowerCase());
		if (data.error) {
			setErrors({ ...errors, message: 'an error occured' });
			return;
		}
		setErrors({ ...errors, tag: '' });
		hideModal();
	};

	return (
		<View style={styles.container}>
			<Header route={route} />
			<Tags showModal={showModal} hideModal={hideModal} />
      <FeedComponent />
			<Provider>
				<Portal>
					<Modal
						visible={visible}
						onDismiss={hideModal}
						contentContainerStyle={containerStyle}
					>
						<Text
							style={{
								alignSelf: 'center',
								marginBottom: 20,
								fontSize: 20,
								fontWeight: 'bold',
							}}
						>
							Create custom tags
						</Text>
						{!!errors.message && (
							<Text
								style={{
									color: 'red',
									fontSize: 16,
									position: 'relative',
									left: 10,
									alignSelf: 'flex-start',
								}}
							>
								{errors.message}
							</Text>
						)}
						<TextInput
							value={tagName}
							placeholder='tagname'
							onChangeText={handleChangeTagName}
							style={{
								margin: 10,
								borderWidth: 0,
							}}
						/>
						<Button
							onPress={handleCreateTag}
							style={{
								backgroundColor: '#3f51b5',
								width: '94%',
								alignSelf: 'center',
								color: 'white',
							}}
						>
							<Text
								style={{
									color: 'white',
								}}
							>
								Create
							</Text>
						</Button>
					</Modal>
				</Portal>
			</Provider>
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
		width: Dimensions.get('window').width,
	},
};

export default Feed;
