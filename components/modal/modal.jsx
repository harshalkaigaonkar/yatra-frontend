import {
	Modal,
	Portal,
	Provider,
} from 'react-native-paper';
import { Dimensions } from 'react-native';

export default function ModalComponent({
  visible,
  hideModal,
  children
}) {
  const containerStyle = {
		backgroundColor: 'white',
		padding: 20,
		height: Dimensions.get('window').height * 0.4,
	};
	return (
		<Provider>
			<Portal>
				<Modal
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={containerStyle}
				>
          {children}
				</Modal>
			</Portal>
		</Provider>
	);
}
