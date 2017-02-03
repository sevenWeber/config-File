import storage from '../utils/storage';

export const QUERY_OPEN_ROOM = 'QUERY_OPEN_ROOM';
export const ENTRY_CLICK = 'ENTRY_CLICK';
export const SELECT_ROOM = 'SELECT_ROOM';
export const QUERY_PACKAGE_INFO = 'QUERY_PACKAGE_INFO';
export const QUERY_INIT_STATE = 'QUERY_INIT_STATE';
export const SET_CURRENT_PACKAGE = 'SET_CURRENT_PACKAGE';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
export const RULE_LAYOUT = 'RULE_LAYOUT';
export const QUERY_OPENING_RULE = 'QUERY_OPENING_RULE';
export const SET_COUNTDOWN = 'SET_COUNTDOWN';
export const SET_COUNTDOWN_TIME = 'SET_COUNTDOWN_TIME';
export const SET_COUNTDOWN_STOP = 'SET_COUNTDOWN_STOP';
export const SET_OPENING_RECORD_MODAL_VISIBLE = 'SET_OPENING_RECORD_MODAL_VISIBLE';
export const QUIT_INNER_HALL = 'QUIT_INNER_HALL';
export const REFRESH = 'REFRESH';
export const CONTINUE_REFRESH = 'CONTINUE_REFRESH';
export const END_UPDATE = 'END_UPDATE';
export const QUERY_MESSAGES = 'QUERY_MESSAGES';
export const QUERY_BIDDER_INFO = 'QUERY_BIDDER_INFO';
export const CANCEL_PACKAGE_DETAIL = 'CANCEL_PACKAGE_DETAIL';
export const QUERY_COUNT = 'QUERY_COUNT';
export const SET_OPERATE_BTNS = 'SET_OPERATE_BTNS';
export const SET_CONFIRM_OPENING_MODAL_VISIBLE = 'SET_CONFIRM_OPENING_MODAL_VISIBLE';
export const QUERY_CONFIRM_OPENING = 'QUERY_CONFIRM_OPENING';
export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE';
export const SET_CA_DECRYPTION_VISIBLE = 'SET_CA_DECRYPTION_VISIBLE';
export const SET_PASSWORD_MODAL_VISIBLE = 'SET_PASSWORD_MODAL_VISIBLE';
export const QUERY_DECRYPT = 'QUERY_DECRYPT';
export const SET_SIGNATURE_MODAL = 'SET_SIGNATURE_MODAL';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const SAVE_CONFIRM_OPENING = 'SAVE_CONFIRM_OPENING';
export const QUERY_ISSUE = 'QUERY_ISSUE';
export const SET_ISSUE_MODAL = 'SET_ISSUE_MODAL';
export const QUERY_OPENING_RECORD = 'QUERY_OPENING_RECORD';
export const QUERY_SIGN = 'QUERY_SIGN';
export const SET_CASIGN_MODAL = 'SET_CASIGN_MODAL';

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
export function queryInitState(roleType, roomId) {
	return (dispatch) => {
		storage.queryInitState(roleType, roomId).then((result) => {
			dispatch({
				type: QUERY_INIT_STATE,
				master: result.master,
				supervisor: result.supervisor,
				bidderStatus: result.bidderStatus,
				openingCount: result.openingCount,
				operateBtn: result.operateBtn
			});
			dispatch({
				type: SET_CURRENT_TIME,
				currentTime: result.serverTime
			});
			dispatch({
				type: SET_COUNTDOWN,
				countType: result.CountDown.countType,
				isRun: result.CountDown.isRun,
				name: result.CountDown.name,
				remainTime: result.CountDown.remainTime
			});
			dispatch({
				type: QUERY_OPENING_RULE,
				visible: result.bidderStatus.hasIntoRoom !== '1',
				decryptionTimeLimit: result.bidderStatus.decryptionTimeLimit,
				signTimeLimit: result.bidderStatus.signTimeLimit
			});
			dispatch({
				type: QUERY_MESSAGES,
				messages: result.messages
			});
		});
	};
}
export function setCurrentTime(currentTime) {
	const nowTime = currentTime + 1000;
	return {
		type: SET_CURRENT_TIME,
		currentTime: nowTime
	};
}
export function ruleLayout(visible) {
	return {
		type: RULE_LAYOUT,
		visible
	};
}
export function setCurrentPackage(currentPackage) {
	return {
		type: SET_CURRENT_PACKAGE,
		currentPackage
	};
}
export function setCountDownTime(remainTime) {
	const nowTime = remainTime - 1;
	return nowTime > 0 ? {
		type: SET_COUNTDOWN_TIME,
		remainTime: nowTime
	} : {
		type: SET_COUNTDOWN_STOP,
		isRun: false
	};
}
export function setOpeningRecordModalVisible(visible) {
	return {
		type: SET_OPENING_RECORD_MODAL_VISIBLE,
		visible
	};
}
export function setConfirmOpeningModalVisible(visible) {
	return {
		type: SET_CONFIRM_OPENING_MODAL_VISIBLE,
		visible
	};
}
export function refresh() {
	return {
		type: REFRESH,
		clickable: false
	};
}
export function updateRemainTime(remainTime) {
	const temp = remainTime - 1;
	return temp > 0 ? {
		type: CONTINUE_REFRESH,
		remainTime: temp
	} : {
		type: END_UPDATE,
		clickable: true
	};
}
export function queryBidderInfo(packageId, roomId) {
	return (dispatch) => {
		storage.queryBidderInfo(packageId, roomId).then((details) => {
			dispatch({
				type: QUERY_BIDDER_INFO,
				visible: true,
				details
			});
		});
	};
}
export function queryTenderFlagCount(packageId, roomId) {
	return (dispatch) => {
		storage.queryTenderFlagCount(packageId, roomId).then((result) => {
			dispatch({
				type: QUERY_COUNT,
				attendanceNum: result.attendanceNum,
				decryptNum: result.decryptNum,
				signatureNum: result.signatureNum
			});
		});
	};
}
export function cancelPackageDetail() {
	return {
		type: CANCEL_PACKAGE_DETAIL
	};
}
export function suetBtns(roleType) {
	switch (roleType) {
	case 'Role_Type_Bidder':
		return {
			type: SET_OPERATE_BTNS,
			btns: [{ icon: '', name: '解密' }, { icon: '', name: '签名' }]
		};
	case 'Role_Type_Tenderee':
		return {
			type: SET_OPERATE_BTNS,
			btns: [{ icon: '', name: '确认开标' }, { icon: '', name: '下发签名' }]
		};
	case 'Role_Type_Supervisor':
		return {
			type: SET_OPERATE_BTNS,
			btns: [{ icon: '', name: '签名' }]
		};
	default:
		return {
			type: SET_OPERATE_BTNS,
			btns: []
		};
	}
}
export function queryConfirmOpening(roomId) {
	return (dispatch) => {
		storage.queryConfirmOpening(roomId).then((list) => {
			dispatch({
				type: QUERY_CONFIRM_OPENING,
				packages: list
			});
		});
	};
}
export function saveConfirmOpening(packageIds, roomId) {
	return (dispatch) => {
		storage.saveConfirmOpening(packageIds, roomId).then((result) => {
			if (result.isOk === '1') {
				dispatch({
					type: SAVE_CONFIRM_OPENING
				});
				dispatch({
					type: CLEAR_MESSAGE
				});
			} else {
				dispatch({
					type: SET_GLOBAL_MESSAGE,
					content: '确认开标操作失败！'
				});
			}
		});
	};
}
export function caDecryptionModelVisible(visible) {
	return {
		type: SET_CA_DECRYPTION_VISIBLE,
		visible
	};
}
export function passwordDecryptionModelVisible(visible) {
	return {
		type: SET_PASSWORD_MODAL_VISIBLE,
		visible
	};
}
export function queryDecrypt(roomId) {
	return (dispatch) => {
		storage.queryDecrypt(roomId).then((list) => {
			dispatch({
				type: QUERY_DECRYPT,
				tenderFiles: list
			});
		});
	};
}
export function setSignatureModal(visible) {
	return {
		type: SET_SIGNATURE_MODAL,
		visible
	};
}
export function endOpeningHall(roomId) {
	return (dispatch) => {
		storage.endOpeningHall(roomId).then((result) => {
			if (result.isOk === '1') {
				dispatch({
					type: QUIT_INNER_HALL
				});
				dispatch({
					type: CLEAR_MESSAGE
				});
			} else {
				dispatch({
					type: SET_GLOBAL_MESSAGE,
					content: '结束开标操作失败！'
				});
			}
		});
	};
}
export function quitRoom(roleType, roomId) {
	return (dispatch) => {
		storage.quitRoom(roleType, roomId).then((result) => {
			if (result.isOk === '1') {
				dispatch({
					type: QUIT_INNER_HALL
				});
				dispatch({
					type: CLEAR_MESSAGE
				});
			} else {
				dispatch({
					type: SET_GLOBAL_MESSAGE,
					content: '退出开标大厅操作失败！'
				});
			}
		});
	};
}
export function queryIssue(packageId, roomId) {
	return (dispatch) => {
		storage.queryIssue(packageId, roomId).then((result) => {
			dispatch({
				type: QUERY_ISSUE,
				issues: result.list
			});
		});
	};
}
export function querySign(packageId, roleType, roomId) {
	return (dispatch) => {
		storage.querySign(packageId, roleType, roomId).then((result) => {
			dispatch({
				type: QUERY_SIGN,
				issues: result.list,
				openingRecordFileList: result.openingRecordFileList
			});
		});
	};
}
export function saveIssue(list, packageId, roomId) {
	return (dispatch) => {
		storage.saveIssue(list, packageId, roomId).then((result) => {
			if (result.isOk === '1') {
				dispatch({
					type: CLEAR_MESSAGE
				});
			} else {
				dispatch({
					type: SET_GLOBAL_MESSAGE,
					content: '下发操作失败！'
				});
			}
		});
	};
}
export function saveSign(list, roleType, roomId, strCeritificate) {
	return (dispatch) => {
		storage.saveSign(list, roleType, roomId, strCeritificate).then((result) => {
			if (result.isOk === '1') {
				dispatch({
					type: CLEAR_MESSAGE
				});
			} else {
				dispatch({
					type: SET_GLOBAL_MESSAGE,
					content: '签名操作失败！'
				});
			}
		});
	};
}
export function queryOpeningRecord(packageId, roleType, roomId) {
	return (dispatch) => {
		storage.queryOpeningRecord(packageId, roleType, roomId).then((result) => {
			dispatch({
				type: QUERY_OPENING_RECORD,
				issues: result.list,
				packageName: result.packageName,
				packageId: result.packageId
			});
		});
	};
}
export function setIssueModal(visible) {
	return {
		type: SET_ISSUE_MODAL,
		visible
	};
}
export function setCaSignModal(visible) {
	return {
		type: SET_CASIGN_MODAL,
		visible
	};
}
export function decrypt(decryptType, list, roomId, strCeritificate) {
	return () => {
		storage.decrypt(decryptType, list, roomId, strCeritificate).then();
	};
}

