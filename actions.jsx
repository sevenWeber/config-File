import storage from '../utils/storage';

export const QUERY_OPEN_ROOM = 'QUERY_OPEN_ROOM';

export function queryOpenRoom(roleType) {
	return (dispatch) => {
		storage.queryOpenRoom(roleType).then((bidRooms) => {
			dispatch({
				type: QUERY_OPEN_ROOM,
				bidRooms
			});
		});
	};
}
export function selectRoom(roleType, id) {
	return (dispatch) => {
		storage.queryRoomPackageList(roleType, id).then((result) => {
			dispatch({
				type: SELECT_ROOM,
				roomId: id,
				currentUser: result.currentUser,
				packageList: result.list,
				entryStatus: result.entryStatus
			});
			dispatch({
				type: QUERY_PACKAGE_INFO,
				packages: result.list
			});
		});
	};
}
export function entryClick(id) {
	return { type: ENTRY_CLICK, id };
}


