import {
	Modal,
	Portal,
	Provider,
} from 'react-native-paper';

export default function ModalComponent({
  visible,
  hideModal,
  children
}) {
  const containerStyle = {
		backgroundColor: 'white',
		padding: 20,
		position: 'absolute',
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
